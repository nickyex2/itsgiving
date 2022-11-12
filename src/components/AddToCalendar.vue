<template>
  <div class="atcb" data-aos="fade-in" data-aos-duration="1500">
    {{
      JSON.stringify({
        name: `${cspTitle} interview`,
        description: `Interview with ${cspTitle} team at ${dateTime}`,
        location: intLocation,
        options: ["Google"],
        startDate: date,
        startTime: starting,
        endTime: ending,
        timeZone: "Asia/Singapore",
      })
    }}
  </div>
</template>

<script>
import { atcb_init } from "add-to-calendar-button";
import { onMounted, ref } from "vue";
export default {
  name: "AddToCalendar-component",
  props: ["cspTitle", "dateTime", "intLocation"],
  setup(props) {
    const date_time_arr = props.dateTime.split(" ");
    const date = date_time_arr[0];
    const time = ref(date_time_arr[1].slice(0, 5));
    const starting = time.value.slice(0, 2) + ":" + time.value.slice(2, 4);
    const endinghrs = parseInt(time.value.slice(0, 2)) + 1;
    const endinghrsString = ref("");
    if (endinghrs < 10) {
      endinghrsString.value = "0" + endinghrs;
    } else {
      endinghrsString.value = endinghrs;
    }
    const ending = endinghrsString.value + ":" + time.value.slice(2, 4);
    onMounted(() => {
      atcb_init();
    });
    return { date, time, starting, ending };
  },
};
</script>

<style></style>
