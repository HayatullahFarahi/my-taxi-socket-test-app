const drivers = []

const addDriver = ({id, lat, long, heading, accuracy}) => {

    //validat the data
    if(!lat || !long || !heading || !accuracy){
        return {
            error: "lat long heading and accuracy are required"
        }
    }

    //check for existing drivers
    const existingDriver = drivers.find((driver)=>{
        return driver.id === id
    })

    //validate index
    if(existingDriver){
        return {
            error: 'User is already present'
        }
    }

    //store driver 
    const driver = {id, lat, long, heading, accuracy}
    drivers.push(driver)
    
    return {
        driver
    }

}

const removeDriver = (id) => {
    const index = drivers.findIndex((driver) => driver.id === id)
    //-1 if match is not found 0 or high if found
    if(!index !== -1){
        //returns array of removed users we return on the first index which is the removed the Driver
        return drivers.splice(index, 1)[0]
    }
}

const getDriver = (id) =>{
    return drivers.find((driver)=> driver.id === id)
}


const driver = addDriver({id: 123, lat: 123.4,  long: 23.0, heading: 234.9, accuracy: 23.0})
const driver2 = addDriver({id: 1234, lat: 123.4,  long: 23.0, heading: 234.9, accuracy: 23.0})
console.log(drivers)
const driver3 = getDriver(123)
console.log(driver3)

module.exports = {
    addDriver,
    removeDriver,
    getDriver,
    drivers
}