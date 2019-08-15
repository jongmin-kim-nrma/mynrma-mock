$('#jobNumberSubmit').on('click', ()=>{
  console.log('click');
  
    const data = {
      "jobNumber": $('#jobNumber').val()   
    }

    axios.post('https://6t7re99ysc.execute-api.ap-southeast-2.amazonaws.com/dev/V1/battery/job', data, header)
    .then((result) => {
        const dataRego = {
            "rego": result.data.rego         
        }

        axios.post('https://6t7re99ysc.execute-api.ap-southeast-2.amazonaws.com/dev/V1/battery/rego', dataRego, header)
        .then((result) => {
            this.setState({
                compatibleBatteries: result.data.GetBatteriesResult
            });
        })
        .catch((error) => {
            this.setState({
                isLoaded: true,
                error
            });
        });
        this.setState({
            isLoaded: true,
            details: result.data
        });
    })
    .catch((error) => {
        this.setState({
            isLoaded: true,
            error
        });
    });
})