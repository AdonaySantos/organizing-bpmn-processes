export const handleGetUser = async (name, password) => {
    e.preventDefault();
    try {
        const response = await axios.post('https://backend-southstar.onrender.co', {
            name,
            password
        });
        setMessage(response.data.message);
    } catch (error) {
        setMessage('Erro ao cadastrar: ' + error.response.data.message);
    }
}