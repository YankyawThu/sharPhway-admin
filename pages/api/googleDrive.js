import { google } from "googleapis"
import { formidable } from 'formidable'
import path from 'path'
import fs from 'fs'

const uploadDir = path.join(process.cwd(), 'public', 'news')
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

export const config = {
  api: {
    bodyParser: false,
  },
}

// const keyFilePath = path.join(process.cwd(), 'service-account.json')

const auth = new google.auth.GoogleAuth({
    // keyFile: keyPath,
    credentials: {
        "type": "service_account",
        "project_id": "lustrous-vertex-265009",
        "private_key_id": "4c84cd401a1786baa88b88f71d053c5e56633c69",
        "private_key": process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
        "client_email": "sharphway-service@lustrous-vertex-265009.iam.gserviceaccount.com",
        "client_id": "101389351374850291227",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/sharphway-service%40lustrous-vertex-265009.iam.gserviceaccount.com",
        "universe_domain": "googleapis.com"
      },
    scopes: ["https://www.googleapis.com/auth/drive"],
})

const drive = google.drive({ version: 'v3', auth })

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            // const { fileName } = req.body
            const response = await drive.files.list({
                // q: `name = '${fileName}'`,
                // pageSize: 10,
                // fileId: "1wwwGHhhlsxSpfXrMwASBCUT4YXtK6YNo",
                fields: "files(id, webViewLink)"
            })
            const files = response.data.files
            // const file = response.data
            if (files.length) {
                return res.status(200).json({files})
            } else {
                return res.status(404).json({msg: 'Not found'})
            }
        } catch (error) {
            return res.status(500).json({msg: error})
        }
    } else if (req.method === 'POST') {
        const { filePaths, fileArray } = await saveTempImage(req)
        const uploadPromises = filePaths.map(async (filePath, i) => {
            const fileStream = fs.createReadStream(filePath)
            const fileMetadata = {
                name: fileArray[i].newFilename, // Use the original file name
                parents: ['1LVUXvC3FbAOe8t0vvGG-888NeBq5T0eC'] // folder name - SharPhway
            }
            const response = await drive.files.create({
                requestBody: fileMetadata,
                media: {
                    // mimeType: file.mimetype,
                    body: fileStream
                },
                fields: 'id, webContentLink'
            })
            await drive.permissions.create({
                fileId: response.data.id,
                requestBody: {
                    role: "reader",
                    type: "anyone",
                },
            })
            response.data.webContentLink = response.data.webContentLink.replace('download', 'view')
            fs.unlinkSync(filePath)
            return response.data
        })
        const results = await Promise.all(uploadPromises)
        return res.status(200).json(results)
    } else if (req.method === 'DELETE') {
    } else {
        res.setHeader('Allow', ['GET', 'POST', 'DELETE'])
        return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}

export function saveTempImage(req) {
    return new Promise((resolve, reject) => {
        const form = formidable({
            uploadDir,
            keepExtensions: true,
            multiples: false,
        })
        form.parse(req, (err, fields, files) => {
            if (err) {
                return res.status(500).json({ msg: 'Failed to save file.' })
            }
        
            // For single file upload
            // const file = Array.isArray(files.file) ? files.file[0] : files.file
            // const filePath = path.join('/news', path.basename(file.filepath))
        
            // For multiple files upload
            const fileArray = Array.isArray(files.file) ? files.file : [files.file]
            const filePaths = fileArray.map(file => file.filepath || file.filepath)
            resolve({ filePaths, fileArray })
        })
    })
}