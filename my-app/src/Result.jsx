function Result(props) {

    return (
        <div>
            <h3>Result</h3>
            Name: {props.data.name} <br />
            Total: {props.data.total} <br />
            Percentage: {props.data.percentage}% <br />
            Grade: {props.data.grade}
        </div>
    );

}

export default Result;