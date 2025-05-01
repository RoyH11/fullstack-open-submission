const Header = (props) => {
    console.log(props)
    return (
        <h1>{props.course}</h1>
    )
}

const Part = (props) => {
    return (
        <p>
        {props.part.name} {props.part.exercises}
        </p>
    )
}

const Content = (props) => {
    return (
        <>
            {props.parts.map(part =>
                <Part key={part.id} part={part} />
            )}
        </>
    )
}

const Total = (props) => {
    // console.log(props.parts)
    const totalCount = props.parts.reduce((sum, part) => sum + part.exercises, 0);
    return (
        <p><strong>Total of {totalCount} exercises</strong></p>
    )
}

const Course = (props) => {
    return (
        <div>
            <Header course={props.course.name} />
            <Content parts={props.course.parts} />
            <Total parts={props.course.parts} />
        </div>
    )
}

export default Course