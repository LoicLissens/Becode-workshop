"use strict";
const http = require("http");
const server = http.createServer();
const fs = require("fs");
const { promisify } = require("util");
const path = require("path");
const readFileAsync = promisify(fs.readFile);
const port = 8080;

const MIMETypes = {
  ".png": "image/png",
  ".html": "text/html",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".js": "application/javascript",
  ".json": "application/json",
  ".css": "text/css",
  ".gif": "image/gif"
};

server.listen(port, () => {
  console.log("Server started");
});

server.on("request", async (request, response) => {
  /* Ce bloc de code est exécuté à chaque requête reçue par le serveur */

  switch (request.method) {
    case "GET":
      const extension = path.extname(request.url);
      if (extension) {
        fs.readFile("./public" + request.url, (err, data) => {
          if (err) {
            response.writeHead(404, {
              "Content-Type": "text/plain; charset=UTF-8"
            });
            response.write("404");
            response.end();
          } else {
            const MIMEType = MIMETypes[extension] || "application/octet-stream";
            response.writeHead(200, { "Content-Type": MIMEType });
            response.end(data);
          }
        });
      } else if (request.url === "/") {
        try {
          const index = await readFileAsync("./public/index.html");

          /*  writeHead permet d’écrire les headers
                        200 est le status code. Le code 200 indique que la requête a été traitée avec succès
                        Le Content-Type indique quel type de données est envoyé par le serveur */
          response.writeHead(200, {
            "Content-Type": "text/html; charset=UTF-8"
          });

          // end() permet de clôturer la requête et d’envoyer la réponse du serveur au client
          response.end(index);
        } catch (err) {
          console.error(err);

          // Les status codes > 500 correspondent à des erreurs côté serveur
          response.writeHead(500, {
            "Content-Type": "text/plain; charset=UTF-8"
          });
          response.end("Erreur 500");
        }

        // Si l’url demandée par l’utilisateur ne correspond à rien, envoyer une erreur 404
      } else {
        response.writeHead(404, {
          "Content-Type": "text/html; charset=UTF-8"
        });

        response.write("ERR 404");
        response.end();
      }
      break;

    default:
      break;
  }
});
