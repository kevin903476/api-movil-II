const fs = require('fs');
const path = require('path');

class ImageService {
  constructor() {
    this.uploadDir = path.join(__dirname, '../public/uploads/');
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
    ['comprobantes', 'profesores', 'estudiantes'].forEach(folder => {
      const dir = path.join(this.uploadDir, folder);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
    });
  }

  async saveBase64Image(base64Image, folder = 'general') {
    try {
      if (!base64Image || !base64Image.startsWith('data:image')) {
        throw new Error('Formato de imagen inválido');
      }
      const matches = base64Image.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
      if (!matches || matches.length !== 3) {
        throw new Error('Formato de base64 inválido');
      }
      const type = matches[1];
      const data = matches[2];
      const buffer = Buffer.from(data, 'base64');

      const targetDir = path.join(this.uploadDir, folder);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      const extension = this.getExtensionFromMimeType(type);
      const fileName = `${Date.now()}_${Math.random()
        .toString(36)
        .substring(2, 10)}.${extension}`;
      const filePath = path.join(targetDir, fileName);

      fs.writeFileSync(filePath, buffer);
      return `/uploads/${folder}/${fileName}`;
    } catch (error) {
      console.error('Error al guardar imagen:', error);
      throw error;
    }
  }

  getExtensionFromMimeType(mimeType) {
    switch (mimeType) {
      case 'image/jpeg':
        return 'jpg';
      case 'image/png':
        return 'png';
      case 'image/gif':
        return 'gif';
      default:
        return 'jpg';
    }
  }

  async deleteImage(imagePath) {
    try {
      if (!imagePath) return false;
      const fullPath = path.join(__dirname, '../public/', imagePath);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error al eliminar imagen:', error);
      throw error;
    }
  }
}

module.exports = new ImageService();
