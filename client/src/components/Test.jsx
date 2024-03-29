// Importing modules
import { useState, useEffect } from "react";
 
function Test() {
    // usestate for setting a javascript
    // object for storing and using data
    const [data, setdata] = useState({
        name: "",
        age: 0,
        date: "",
        programming: "",
    });
    
    const getData = async()=>{
        // Using fetch to fetch the api from
        // flask server it will be redirected to proxy
        try {
            // const response =await fetch('http://localhost:8080/post/4',{
            //     method:"POST",
            //     headers: {
            //         'Content-Type': 'application/json',
            //     }
            // }) 
            fetch("http://localhost:5000/data",{
                method:"POST",
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then((res) =>
            res.json().then((data) => {
                // Setting a data from api
                setdata({
                    name: data.Name,
                    age: data.Age,
                    date: data.Date,
                    programming: data.programming,
                });
            })
        );
        } catch (error) {
            console.log(error);
        }
    }

    const getPetData = async()=>{
        const sendData = {'currentMessage':"你能抱抱我吗",
                            'createdAt':new Date()};
        //data="你能抱抱我吗";
        // Using fetch to fetch the api from
        // flask server it will be redirected to proxy
        try {
            // const response =await fetch('http://localhost:8080/post/4',{
            //     method:"POST",
            //     headers: {
            //         'Content-Type': 'application/json',
            //     }
            // }) 
            await fetch("http://localhost:5000/api/pet",{
                method:"POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(sendData)
            }).then((res) =>
            res.json().then((data) => {
                // Setting a data from api
                console.log(data)
            })
        );
        } catch (error) {
            console.log(error);
        }
    }

    // Using useEffect for single rendering
    useEffect(() => {
        
        
    }, []);
 
    return (
        <div className="App">
            <header className="App-header">
                <h1>React and flask</h1>
                {/* Calling a data from setdata for showing */}
                <p>{data.name}</p>
                <p>{data.age}</p>
                <p>{data.date}</p>
                <p>{data.programming}</p>
 
            </header>

            <button onClick={getData}>normal data</button>
            
            <button onClick={getPetData}>chat data</button>
        </div>
    );
}
 
export default Test;