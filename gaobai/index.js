const api = 'https://test.h5jun.com/index/gaobai?text=';

submitBtn.onclick = async function(evt) {
    evt.preventDefault();
    
    let {data} = await axios.get(api + t.value);
    gaobai.src = 'data:image/jpeg;base64,' + data.data;
};
