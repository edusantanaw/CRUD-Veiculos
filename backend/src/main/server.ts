import express from "express";

class Server {
  private app = express();
  private Port = 3000;

  private middlewares(){
    this.app.use(express.urlencoded({extended: true}))
    this.app.use(express.json());
  }

  private start() {
    const cb = () => console.log(`Server running at ${this.Port}`);
    this.app.listen(this.Port, cb);
  }

  public bootstrap(){
    this.middlewares()
    this.start()
  }
}

const server = new Server()
server.bootstrap()