import Input from "../components/Input";

const Home = () => {
  return (
    <div>Home
    <Input fieldType="password"  labelText="Password"></Input>
    <Input fieldType='outlined-required' size='30rem' labelText = 'Name' defaultValue ="Marko"  ></Input>
    <Input fieldType='outlined-disabled'  ></Input>
    <Input fieldType='number'  ></Input>
    <Input fieldType='helperText' labelText = 'Name' helperText='Enter your name' ></Input>
    

    </div>
  )
}

export default Home