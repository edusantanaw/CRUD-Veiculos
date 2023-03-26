import express from "express";
import routes from "./config/routes";
import cors from "cors";

class Server {
  private app = express();
  private Port = 3000;
  private origin = "http://localhost:5173/" 

  private middlewares() {
    this.app.use(cors({ credentials: true, origin: this.origin }));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  private start() {
    const cb = () => console.log(`Server running at ${this.Port}`);
    this.app.listen(this.Port, cb);
  }

  public bootstrap() {
    this.middlewares();
    this.start();
    routes(this.app);
  }
}

const server = new Server();
server.bootstrap();
