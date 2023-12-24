export function getApiErrorStr(response) {
    let errorListStr = "";
    
    Object.entries(response.data)
        .forEach(([field, errors]) => {
            if (typeof errors == "string") {
                errorListStr = errors
            }
            else {
                errorListStr = errors[0]
            }
        })

    return errorListStr ? errorListStr : "Error";
}