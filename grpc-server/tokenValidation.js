export default (call, callback) => {
  console.log('>>>>>>>>>>>>>>>>>>', call)
  return callback(null, {
  is_valid: true,
  tenant_id: 234523,
  user_id:6789,
  role: 'admin',
  error_message: null,
})
}