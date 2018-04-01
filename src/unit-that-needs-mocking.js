exports.writeSumToFile = (a, b, fileSumWriter) => {
  const sum = a + b

  fileSumWriter(sum)
}
