(async function() {
  await new Promise(resolve => {
    console.log('hi')
    setTimeout(resolve, 1000)
  })

  console.log('bye')
})()
