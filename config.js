const fs = require('fs')
const chalk = require('chalk')

global.apikey = '-' //https://api.lolhuman.xyz
global.rosekey = '-' //https://api.itsrose.life
//—————「 Set Nama Bot & Own 」—————//
global.namabot = 'Rizey Bot'
global.namaowner = 'Rizemary リズマリー'

//—————「 Setting Owner 」—————//
global.owner = '6283135080900'
global.ownernomer = ["6283135080900"]
global.premium = ['6283135080900']

//—————「 Set Wm 」—————//
global.packname = ''
global.author = 'Rizemary リズマリー'
global.prefa = ['', '.']
global.sp = '•'

//—————「 Set Message 」—————//
global.mess = {
    done: 'Done ✅',
    admin: 'Feature Only for _*Admin Group*_',
    botAdmin: 'Perintah Ini Hanya Bisa Digunakan Ketika Bot Menjadi Admin Group !',
    owner: 'Feature Only for _*owner*_',
    group: 'Feature Only for _*Group Chat*_',
    private: 'Feature Only for _*Admin Group*_',
    wait: 'Wait a Moment, for Process',
    endLimit: 'Your imit has run out, Wait at 12 at night',
    error: '*!!!Feature Error!!!*',
}

//—————「 Set Limit 」—————//
global.limitawal = {
    premium: "Infinity",
    free: 1000,
}

//—————「 Set Image 」—————//
global.imageurl = 'https://telegra.ph/file/da68e58ea208a3ae579b5.jpg'
global.isLink = `https://youtube.com/@sendalmantan`
global.thumb = fs.readFileSync('./media/thumb.jpg')

//—————「 Batas Akhir 」—————//
let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright(`Update'${__filename}'`))
    delete require.cache[file]
    require(file)
})
