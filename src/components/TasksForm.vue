<script setup lang="ts">
import { reactive } from "vue"
import type Task from "@/types/Task"

const props = defineProps<{
  task: Task,
  frequencies: string[]
}>()

const form = reactive(props.task)
</script>

<template>
  <form>
    <label>Select a frequency</label>
    <select v-model="form.frequency">
      <option
        v-for="option in frequencies"
        :value="option"
        :key="option"
        :selected="option === form.frequency"
      >{{ option }}</option>
    </select>

    <h3>Name & describe your task</h3>
    <label>Name</label>
    <input
      v-model="form.name"
      type="text"
      placeholder="Name"
      class="field"
    >

    <label>Description</label>
    <textarea                          
      v-model="form.description"
      placeholder="Description"
      class="field"
    ></textarea>

    <h3>Task situation</h3>
    <div>
      <input
        type="radio"
        v-model="form.situation"
        :value="0"
        name="situation"
      />
      <label>Unstarted</label>
    </div>

    <div>
      <input
        type="radio"
        v-model="form.situation"
        :value="1"
        name="situation"
      />
      <label>Started</label>
    </div>    
    
    <div>
      <input
        type="radio"
        v-model="form.situation"
        :value="2"
        name="situation"
      />
      <label>Completed</label>
    </div>

    <h3>Supervision</h3>
    <div>
      <input
        type="checkbox"
        v-model="form.supervision.reviewed"
        class="field"
      />
      <label>Reviewed</label>
    </div>

    <div>
      <input
        type="checkbox"
        v-model="form.supervision.approved"
        class="field"
      />
      <label>Approved</label>
    </div>

    <button
      class="btn btn-primary"
      type="submit"
    >
      Submit
    </button>
  </form>    
</template>