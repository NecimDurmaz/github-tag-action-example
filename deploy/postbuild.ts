const fs = require("fs");
const path = require("path");

// Build sonrası dosyayı bulma
const indexPath = path.join(__dirname, "dist", "index.html"); // dist klasörü, build çıktınızın bulunduğu klasör olmalı

// Yeni versiyon bilgisini almak
const version = process.env.VERSION; // Bu, GitHub Action'dan alacağımız yeni versiyon bilgisi

// Dosya okuma ve yazma
fs.readFile(indexPath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading index.html:", err);
    return;
  }

  // index.html içindeki versiyon bilgisini güncelleme
  const updatedData = data.replace(/<meta name="version" content=".*">/, `<meta name="version" content="${version}">`);

  // Güncellenmiş içeriği dosyaya yazma
  fs.writeFile(indexPath, updatedData, "utf8", (err) => {
    if (err) {
      console.error("Error writing to index.html:", err);
    } else {
      console.log("index.html version updated successfully!");
    }
  });
});
