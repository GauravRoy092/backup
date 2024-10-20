import express from "express";
import cors from "cors";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";
import { exec } from "child_process"; //dangerous watch out

const app = express();

// Enable CORS and JSON parsing middleware
app.use(
  cors({
    origin: ["http://localhost:8000", "http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());

// Set custom CORS headers (if needed)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

// Configure multer for file uploads (Multer Middleware)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + uuidv4() + path.extname(file.originalname));
  },
});

// Multer configuration
const upload = multer({ storage: storage });

// File upload and video conversion route
app.post("/upload", upload.single("file"), (req, res) => {
  const lessonId = uuidv4();
  const videopath = req.file.path;
  const outputpath = `./uploads/course/${lessonId}`;
  const hlsPath = `${outputpath}/index.m3u8`;

  // Ensure output directory exists
  if (!fs.existsSync(outputpath)) {
    fs.mkdirSync(outputpath, { recursive: true });
  }

  // Convert video to HLS using FFmpeg
  exec(
    `ffmpeg -i ${videopath} -c:v h264 -hls_time 10 -hls_list_size 0 -f hls ${hlsPath}`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return res.status(500).json({ error: "Video conversion failed" });
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
      }
      console.log(`stdout: ${stdout}`);
      res.json({
        message: "File uploaded and converted successfully",
        hlsPath: hlsPath,
      });
    }
  );
});

// Default route
app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

// Start the server
app.listen(8000, function () {
  console.log("Server is running on port 8000");
});
