import { handleFunctions } from "./commands"


const command = process.argv[2]
const allCommand = process.argv

switch (command) {

    case "convert":
        handleFunctions.handleRegisterConversion(allCommand)
        break

    case "list":
        handleFunctions.handleList()
        break

    case "get":
        const getInstanceID = process.argv[3]
        handleFunctions.handleGet(getInstanceID)
        break

    case "delete":
        const deleteInstanceID = process.argv[3]
        handleFunctions.handleDelete(deleteInstanceID)

    case "drop":
        handleFunctions.handleDeleteAll()

}

// Estructuras de comandos

// Register Conversion
// convert USD NIO 100

// List Conversion
// list

// Get Conversion
// get id

// Detele Conversion
// delete id

// Delete All Conversion
// drop