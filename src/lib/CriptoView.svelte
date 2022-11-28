<script>
  import { onMount } from "svelte";
  import { baseGeckoApi } from "../baseGeckoApi";
  import { FormGroup, Input } from "sveltestrap/src";

  let currentPrice = "";
  let coinsList = [];
  let selectedCoin = "usd";
  let downCounter = 10;
  let selectedCripto = "bitcoin";
  let criptos = [
    {
      text: "Ethereum",
      value: "ethereum",
    },
    {
      text: "Bitcoin",
      value: "bitcoin",
    },
    {
      text: "ATOM",
      value: "cosmos",
    },
  ];

  const formatToCurrency = (/** @type {number | string} */ value) => {
    const formatToNumber = Number(value);
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(formatToNumber);
  };

  const getCurrentCoinPrice = async (
    /** @type {string | number} */ coin,
    /** @type {string} */ cripto
  ) => {
    const { data } = await baseGeckoApi.get(`/coins/${cripto}`);
    const { current_price: prices } = data.market_data;
    const coinsKeys = Object.keys(prices);
    coinsList = coinsKeys.map((key) => {
      return {
        name: key.toUpperCase(),
        value: key,
      };
    });
    currentPrice = formatToCurrency(prices?.[coin] || prices?.usd);
    downCounter = 10;
  };

  const decreseCounter = () => {
    downCounter = downCounter - 1;
    if (downCounter === -1) {
      getCurrentCoinPrice(selectedCoin, selectedCripto);
    }
  };

  onMount(async () => {
    setInterval(decreseCounter, 1000);
    getCurrentCoinPrice(selectedCoin, selectedCripto);
  });

  $: getCurrentCoinPrice(selectedCoin, selectedCripto);
</script>

<main class="wrapper">
  <p>
    <span class="title">{selectedCripto}</span> price in:
    <span class="price">
      {selectedCoin && selectedCoin.toLocaleUpperCase()}
      {currentPrice}
    </span>
  </p>
  <small class="teste"
    >this price might update in <span>{downCounter}</span></small>
  <FormGroup>
    <Input type="select" bind:value="{selectedCoin}">
      <option disabled>Select a coin</option>
      {#each coinsList as coin}
        <option value="{coin.value}">{coin.name}</option>
      {/each}
    </Input>
  </FormGroup>
  <FormGroup>
    <Input type="select" bind:value="{selectedCripto}">
      <option disabled>Select a crypto</option>
      {#each criptos as cripto}
        <option value="{cripto.value}">{cripto.text}</option>
      {/each}
    </Input>
  </FormGroup>
</main>

<style lang="scss">
  .wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;

    p {
      font-size: 1.7rem;
      font-weight: bold;
      animation: fadeIn 1s ease-in-out;
      .title {
        text-transform: capitalize;
        color: red;
      }

      .price {
        color: green;
      }
    }

    small {
      margin: 1em 0;
      font-size: 0.7rem;

      span {
        font-weight: bold;
      }
    }
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
</style>
