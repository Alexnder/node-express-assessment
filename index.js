// eslint-disable-next-line func-names
(async function() {
  await new Promise(resolve => {
    console.log('hi')
    setTimeout(resolve, 1000)
  })

  console.log('bye')
}())
