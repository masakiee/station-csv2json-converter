import fs from 'fs';
import path from 'path';
import csvParseSync from 'csv-parse/lib/sync';

const FILES = [
  'company20200619',
  'join20200619',
  'line20200619free',
  'station20200619free',
];

FILES.forEach((fileName) => {
  const filePath = path.join(__dirname, 'data', `${fileName}.csv`);
  const file = fs.readFileSync(filePath);

  let parsedCsv: string[][];
  try {
    parsedCsv = csvParseSync(file);
  } catch (e) {
    console.log('CSV parse error');
    console.log(e);
    return;
  }

  const header = parsedCsv.shift();
  // header が取得できない場合はデータが壊れているので
  // 当該ファイルに対しての処理中断
  if (header === undefined) {
    console.log('No Header data error');
    return;
  }

  // CSV1行の各値の配列を header の値をキーとするオブジェクトに変換
  const parsedToJSON = parsedCsv.map((row) => {
    const data: { [key: string]: string } = {};
    row.forEach((value, index) => {
      const key = header[index];
      data[key] = value;
    });
    return data;
  });

  const jsonFilePath = path.join(__dirname, 'json', `${fileName}.json`);
  // json/ ディレクトリが存在しない場合には新規作成する
  const outputDir = path.join(__dirname, 'json');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }
  // ファイルがすでに存在した場合には上書きする
  const jsonData = JSON.stringify({ data: parsedToJSON }, null, 2);
  fs.writeFileSync(jsonFilePath, jsonData, { flag: 'w+' });
});
