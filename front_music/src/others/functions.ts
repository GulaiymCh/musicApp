export const checkPhoto = (file: string) => {
  return file.endsWith('.png') || file.endsWith('.svg') || file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.webp') ?
    true :
    'The program does not support this file format'
}

export const checkMusic = (file: string) => {
  return file.endsWith('.mp3') ?
    true :
    'The program does not support this file format, supporting files: mp3'
}