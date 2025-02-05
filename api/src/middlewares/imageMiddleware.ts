import { Request, Response, NextFunction } from 'express';
import B2 from 'backblaze-b2';
import multer from 'multer';
export const multerUpload = multer({ storage: multer.memoryStorage() });
export const b2 = new B2({
  applicationKeyId: process.env.B2_APPLICATION_KEY_ID!,
  applicationKey: process.env.B2_APPLICATION_KEY!,
});
export function getImageUrl(imagePath: string) {
  return (
    'https://' +
    process.env.B2_BUCKET_NAME +
    '.' +
    process.env.B2_BUCKET_URL +
    '/' +
    imagePath
  );
}
export function uploadToB2(folderName: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
      return next();
    }

    try {
      // Auth check for backblaze
      await b2.authorize();

      // Retrieve file path if image already exists
      const previousFilePath = req.body.previousFilePath;

      if (previousFilePath) {
        // Update image
        const previousFileName = previousFilePath.replace(
          `/${folderName}/`,
          ''
        );
        const { data } = await b2.listFileVersions({
          bucketId: process.env.B2_BUCKET_ID!,
          startFileName: previousFilePath,
          startFileId: '',
          maxFileCount: 1,
        });

        if (data.files.length > 0) {
          await b2.deleteFileVersion({
            fileId: data.files[0].fileId,
            fileName: previousFilePath,
          });
        }
      }

      const {
        data: { uploadUrl, authorizationToken },
      } = await b2.getUploadUrl({
        bucketId: process.env.B2_BUCKET_ID!,
      });

      // Set a standardized file naming structure to easily retrieve from backblaze
      // TODO: Going to want to add handling for a familyId for the images rather than having them all in the same folder
      const fileName = `${folderName}/${Date.now()}-${req.file.originalname}`;
      const { data: file } = await b2.uploadFile({
        uploadUrl,
        uploadAuthToken: authorizationToken,
        fileName,
        data: req.file.buffer,
        mime: req.file.mimetype,
      });

      // Want access to the image on the request object
      req.body.image = `${fileName}`;

      next();
    } catch (error) {
      next(error);
    }
  };
}
