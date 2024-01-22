import { reactive } from 'vue'

export default () => {   
  const task = reactive({
    frequency: '',
    name: '',
    description: '',    
    situation: 0,
    supervision: {
      reviewed: false,
      approved: false
    }
  })

  // this could be set from an http request service
  const frequencies = [
    'annual',
    'biannual',
    'biweekly',
    'daily',
    'eventual',
    'monthly',
    'quarterly',
    'weekly'
  ]

  return { frequencies, task }
}