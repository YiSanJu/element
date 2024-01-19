const Converter = require('markdown-to-vue-loader');
const fs = require('fs');
const path = require('path');
const mdToVue = (inputFolder, outputFolder) => {
  if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder, { recursive: true });
  }

  const files = fs.readdirSync(inputFolder);
  files.forEach((file) => {
    if (path.extname(file) === '.md') {
      const mdFilePath = path.join(inputFolder, file);
      const vueFileName = `${path.parse(file).name}.vue`;
      const vueFilePath = path.join(outputFolder, vueFileName);
      console.log(Converter, Converter.convert, Converter.Converter);
      const mdContent = fs.readFileSync(mdFilePath, 'utf8');
      const vueContent = Converter.convert(mdContent);
      fs.writeFileSync(vueFilePath, vueContent);
      console.log(`${mdFilePath} converted to ${vueFilePath}`);
    }
  });
};

const inputFolder = './build/inputFolder';
const outputFolder = './build/outputFolder';

mdToVue(inputFolder, outputFolder);
