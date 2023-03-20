# How to use it

- Import the custom hook in the component: `import { useApi } from '../api';`
- Destructure the API method needed: `const { handleAllCoins } = useApi();`
- Use the method for example with a state:

```
  const [coins, setCoins] = useState();

  useEffect(() => {
    handleAllCoins().then((res) => setCoins(res));
  }, []);

  console.log(coins);
```
