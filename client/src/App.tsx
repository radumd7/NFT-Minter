import { Box, Button, chakra, Container, Heading, Spinner, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useWeb3 } from "./components/Context";
import { connectWallet, MintNFT } from "./components/lib/web3/functions";

export default function App() {
    const { account, setAccount } = useWeb3();
    const [ txStatus, setTxStatus ] = useState< null | string >(null);
    const [ loading, setLoading ] = useState(false);
    const metamask = window.ethereum;
    return(
        <main>
            <Container maxW="container.lg" width="full">
                <Heading as="h1" size="4xl" color="purple.600" textAlign='center' mt={20}>Random Words NFT</Heading>
                <Box borderWidth="1px" borderRadius="lg" p={4} bgColor="gray.50" my={20}>
                    {account &&<Text as="h2" fontSize="xl" mb={5}><chakra.span fontWeight="bold" color="purple.600">Connected as:</chakra.span>{' ['+account.substring(0, 6)+' ... '+account.substring(38)+']'}</Text>}
                    <Text fontSize="xl" mb={5}>
                        This collection is hosted on the <chakra.span fontWeight="bold" color="purple.600">Rinkeby Test Network</chakra.span>. Make sure you're on the right network!
                    </Text>
                    <Text as="p" fontSize="xl" mb={5}>{`You can view the collection on `}
                        <chakra.span
                            color="purple.600"
                            fontWeight="bold"
                        >
                            <a
                            href="https://testnets.opensea.io/collection/3wordsnft-fdsx5aiufd"
                            target="_blank"
                            rel="noreferrer"
                            >
                                OpenSea
                            </a>
                        </chakra.span>.
                    </Text>
                    <Text as="p" fontSize="xl">{`You can find the source code on `}
                        <chakra.span
                            color="purple.600"
                            fontWeight="bold"
                        >
                            <a
                            href="https://github.com/radumd7/NFT-Minter"
                            target="_blank"
                            rel="noreferrer"
                            >
                                GitHub
                            </a>
                        </chakra.span>.
                    </Text>
                    { txStatus && <Text as="h3" fontSize="xl" mt={5}>{txStatus}</Text> }
                </Box>
                {(!account && metamask) && (
                    <Button
                        colorScheme="purple"
                        size="lg"
                        width={'full'}
                        onClick={ async () => {
                            connectWallet()
                                .then(res=>{
                                    setAccount(res);
                                })
                        }}
                    >Connect Wallet</Button>
                )}
                {(account && metamask) &&
                    (
                        <Button
                            colorScheme="purple"
                            size="lg"
                            width={'full'}
                            onClick={async ()=>{
                                setLoading(true);
                                await MintNFT(account!).then(res=>{
                                    if((res as any).ok){
                                    setTxStatus("NFT Successfully minted!!!"); 
                                    }else{
                                        setTxStatus(res as string);
                                    }
                                });
                                setLoading(false);
                            }}
                        >{loading && (<Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='purple.600' size='md' />)}{loading ? 'Minting NFT' : 'Mint NFT'}</Button>
                    )
                }
                {!metamask && 
                    (
                        <Button
                            colorScheme="purple"
                            size="lg"
                            width={'full'}
                        >
                            <a
                                href="https://metamask.io/download/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Install MetaMask
                            </a>
                        </Button>
                    )
                }
            </Container>
        </main>
    );
};