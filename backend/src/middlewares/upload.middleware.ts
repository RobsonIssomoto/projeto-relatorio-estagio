import multer from "multer";
import path from "path";

// Configura onde e como os arquivos serão salvos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Pasta onde os arquivos ficarão salvos localmente
    cb(null, "uploads/comprovantes");
  },
  filename: (req, file, cb) => {
    // Renomeia o arquivo para evitar nomes duplicados (timestamp + nome original)
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// Filtro de validação de segurança (Back-end)
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedMimeTypes = ["image/jpeg", "image/png", "application/pdf"];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Formato de arquivo não suportado. Envie JPG, PNG ou PDF."));
  }
};

export const uploadComprovantes = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // Limite de 10MB
    files: 5, // Máximo de 3 arquivos por requisição
  },
  fileFilter: fileFilter,
});
