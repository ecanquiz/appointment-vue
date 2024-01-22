interface Task {
    frequency: string
    name: string
    description: string
    situation: number
    supervision: {
      reviewed: boolean,
      approved: boolean
    }
  }
  
  export default Task