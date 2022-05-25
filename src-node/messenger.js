import process from 'node:process';
import readline from 'node:readline';

class Messenger {
  start() {
    if (this.rl) {
      return;
    }

    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: ''
    });
  }

  stop() {
    if (this.rl) {
      this.rl.close();
      this.rl = null;
    }
  }

  _write(msg) {
    console.log(JSON.stringify(msg));
  }

  write(msg) {
    if (typeof msg === 'string') {
      console.log(msg);
    } else {
      this._write(msg);
    }
  }

  log(msg) {
    this._write({ event: 'log', data: msg });
  }
}

const messenger = new Messenger();
export default messenger;
