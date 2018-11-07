import React, { Component } from 'react';
import SimpleMap from "./Map";
import { fetchTravels } from "../actions";
import {connect} from "react-redux";
import arrows from "../assets/arrows.png"
import right from '../assets/right.png';

class Travel extends Component {
    constructor(){
        super()
    }
    render(){
        console.log("TRAVEL RENDER")
        const { data } = this.props;
        const { title, short, description, distance } = data;
        return (
            <div style={{marginTop: '0', height: '100px'}} className="row m-4 bg-light">
                <div className="col-2 no-pad border">
                    <img style={{width: '100%', paddingTop: '15px'}} src={arrows} alt=""/>
                </div>
                <div className="col-6 border" >
                    <h4>{title}</h4>
                    <div style={{
                        height: '60px',
                        overflow: 'hidden',}}>{short}</div>
                </div>
                <div className="col-4" style={{ marginTop: '35px' }}>
                        <h4>
                            {distance > 0 ? (distance/1000).toFixed(2) : 0}&nbsp;km

                            <img className="float-right" style={{ height: '20px', width: '20px' }} src={right} alt=""/>

                        </h4>
                </div>
            </div>
        )
    }
}

class App extends Component {
    constructor(){
        super();
        this.state={
            mapLoaded: false,
        }
    }
    componentWillMount() {
        this.props.fetchTravels();
    }
    render() {
        console.log("travels", this.props.travels)
        const { travels } = this.props;
        return (
                <div className="p-5 h-100">
                    <div className="row h-100 w-100">
                        <div className="col-sm border-right p-3">
                            <form className="card card-sm">
                                <div style={{marginBottom: '0'}} className="card-body row no-gutters align-items-center">
                                    <div className="col-auto">
                                        <i className="fas fa-search h4 text-body"></i>
                                    </div>
                                    <div className="col">
                                        <input className="form-control form-control-lg"
                                               type="search" placeholder="Search treavel"/>
                                    </div>
                                </div>
                                <div className="p-1">
                                    {travels.length > 0 && travels.map((travel) => {
                                        return <Travel data={travel}/>
                                    })}
                                </div>

                            </form>
                        </div>
                        <div className="col-sm p-3">
                            {this.state.mapLoaded ?
                            <SimpleMap/> :
                                <h3 class="text-center">
                                    Choise travel for show
                                </h3>
                            }
                        </div>
                    </div>
                </div>
        );
    }
}

const mapStateToProps = ({ basic }) => {
    console.log('mSTP FullReports.js > ', basic);
    const {
        travels,
    } = basic;
    return {
        travels,
    };
};

export default connect(mapStateToProps, {
    fetchTravels
})(App);