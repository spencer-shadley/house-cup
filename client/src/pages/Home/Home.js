import React, { Component } from "react";
import API from "../../utils/API";

class Home extends Component {
    state = {
        data: "",
        challenge: "",
        hcdaysuntil: ""
    };

    getData = () => {
        API.getPoints()
            .then(res => {
                const data = res.data.sort((a, b) =>
                    this.getNormalizedPoints(b) - this.getNormalizedPoints(a));
                this.setState({
                    data: data
                });
            })
            .catch(err => console.log(err));
    }

    getNormalizedPoints(houseData) {
        const totalClassSize = 29;
        const numHouses = 4;
        return (totalClassSize / houseData.num_members / numHouses * houseData.points).toFixed();
    }

    componentWillMount() {
        // API.getChallenges()
        //     .then(res => {
        //         this.setState({ challenge: res.data.challenge });
        //     });
        // const today = new Date();
        // const hc = new Date(today.getFullYear(), 8, 27);
        // if (today.getMonth() === 8 && today.getDate() > 27) {
        //     hc.setFullYear(hc.getFullYear() + 1);
        // }
        // const one_day = 1000 * 60 * 60 * 24;
        // this.setState({ hcdaysuntil: Math.ceil((hc.getTime() - today.getTime()) / (one_day)) })
        this.getData();
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row mx-5 my-5">
                    <h1 className="title"><span className="mr-2"><img className="school-logo-image" src="./img/uw-logo.jpg" alt="University of Washington" /></span> Coding Bootcamp House Points</h1>
                </div>
                {/* <div className="row mx-xl-5 mx-sm-1 mt-2">
                    <div className="col-12">
                        <div className="alert alert-light" role="alert">
                            <h3 className="text-center"><strong>{this.state.hcdaysuntil} days</strong> until the House Cup!</h3>
                        </div>
                    </div>
                </div> */}
                <div className="row mx-xl-5 mx-sm-1 mt-6 mb-5 align-items-center">
                    {this.state.data ? this.state.data.map((item, i) => (
                        <div className="col-12 col-md-6 col-xl-3 mb-5" key={item.house}>
                            <div className="card">
                                {i === 0 ? (
                                    <div className="card-header text-center">
                                        <span role="img" aria-label="Trophy">🏆</span> {item.house} is Currently in First Place <span role="img" aria-label="Trophy">🏆</span>
                                    </div>
                                ) : ""}
                                <div className="card-body">
                                    <p><img className="houseImage" height="200" src={item.owl ? `img/${item.owlimage}` : `img/${item.image}`} alt={item.house} /></p>
                                    <h5 className="houseName">{item.house}</h5>
                                    <h1 className="housePoints">{item.points}</h1>
                                    <hr />
                                    <h2 className="houseWeekPoints">Normalized points: <strong>{this.getNormalizedPoints(item)}</strong></h2>
                                </div>
                            </div>
                        </div>
                    )) : ""}
                </div>
                {/* <nav className="navbar fixed-bottom navbar-expand-sm navbar-dark bg-dark">
                    <span className="text-white"><strong><span role="img" aria-label="badge">🎖 Current challenge</span></strong> {this.state.challenge}</span>
                </nav> */}
                <nav className="navbar fixed-bottom navbar-expand-sm navbar-dark bg-dark">
                    <span className="text-white">
                        <strong>
                            <span role="img" aria-label="badge">🎖 How can I earn points for the house cup? </span>
                        </strong>
                        <a href="https://arronjlinton.github.io/HouseCupPoints/" target="_blank" rel='noreferrer noopener'>
                            Click here to find out
                        </a>
                    </span>
                </nav>
            </div>
        );
    }
}

export default Home;
