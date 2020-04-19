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


module.exports = {
    addDriver,
    removeDriver,
    getDriver,
    drivers
}