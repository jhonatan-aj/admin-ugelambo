import { v2 as cloudinary } from 'cloudinary'

if (process.env.CLOUDINARY_URL) {
  const cloudinaryUrl = process.env.CLOUDINARY_URL
  const regex = /cloudinary:\/\/(\d+):([^@]+)@(.+)/
  const match = cloudinaryUrl.match(regex)

  if (match) {
    cloudinary.config({
      cloud_name: match[3],
      api_key: match[1],
      api_secret: match[2],
    })
  }
} else {
  console.warn('⚠️ CLOUDINARY_URL no está configurada. Las subidas de imágenes fallarán.')
}

export const uploadToCloudinary = async (
  buffer: Buffer,
  filename: string,
  folder: string = 'ugel-admin',
): Promise<{
  url: string
  publicId: string
  width: number
  height: number
  format: string
}> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'auto',
        public_id: filename.split('.')[0],
      },
      (error, result) => {
        if (error) {
          reject(error)
        } else if (result) {
          resolve({
            url: result.secure_url,
            publicId: result.public_id,
            width: result.width,
            height: result.height,
            format: result.format,
          })
        } else {
          reject(new Error('No result from Cloudinary'))
        }
      },
    )
    uploadStream.end(buffer)
  })
}

export const deleteFromCloudinary = async (publicId: string): Promise<void> => {
  await cloudinary.uploader.destroy(publicId)
}
