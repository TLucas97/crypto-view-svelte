<script>
  import { Link } from "svelte-navigator";
</script>

<div class="header">
  <span><Link to="/">Home</Link></span>
  <span><Link to="/history">History</Link></span>
</div>

<style lang="scss">
  .header {
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      margin: 10px 10px;
      font-weight: bold;
    }
  }
</style>
