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

// const Total = (props) => {
//     // console.log(props.parts)
//     const totalCount = props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises
//     return (
//         <p>Number of exercises {totalCount} </p>
//     )
// }

const Course = (props) => {
    return (
        <div>
            <Header course={props.course.name} />
            <Content parts={props.course.parts} />
            {/* <Total parts={props.course.parts} /> */}
        </div>
    )
}

export default Course