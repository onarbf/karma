
emailTemplate = (body)=>{
  return (
 `
 <h1>Hi from Karma team</h1>
 <br><br>
 <p>${body}</p>
 `
  )
}

module.exports = emailTemplate
