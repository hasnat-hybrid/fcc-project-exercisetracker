const array  = [
      {
        description: 'second',
        duration: 15,
        date: 'Sun Sep 09 2018',
        //author: new ObjectId("62920e96adc5ead5c4db3020")
      },
      {
        description: 'third',
        duration: 15,
        date: 'Sun Sep 09 2018',
        //author: new ObjectId("62920e96adc5ead5c4db3020")
      },
      {
        description: 'fourth',
        duration: 15,
        date: 'Sun Sep 09 2018',
        //author: new ObjectId("62920e96adc5ead5c4db3020")
      }
]

array.forEach(function (v) {
    delete v.date
    return v
})

console.log(array);