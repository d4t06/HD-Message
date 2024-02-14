

const generateSongId = (song) => {
       const nameAndSinger = song.name.replaceAll(/[\W_]/g, '') +"_"+song.singer.replaceAll(/[\W_]/g, '')
   return nameAndSinger.toLocaleLowerCase()

}

const id = generateSongId({name: "A S'ky Fu'll Of Stars", singer:"Coldplay, ajdhf.adfa&^!@%^&@%"})

console.log('check id', id)