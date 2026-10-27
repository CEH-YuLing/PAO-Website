import sharp from 'sharp';
// Same approved artwork and dimensions; smaller AVIF delivery for mobile screens.
for(const width of [384,400,512]){
  await sharp('public/images/pao-chibi-source.png').resize({width,withoutEnlargement:true})
    .avif({quality:44,effort:6}).toFile(`public/images/pao-hologram-v3-${width}.avif`);
}
