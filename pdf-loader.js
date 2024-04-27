// const { OpenAI } = require('langchain/llms/openai');
const { OpenAI } = require ('@langchain/openai');
const { PDFLoader } = require('langchain/document_loaders/fs/pdf');
const { FaissStore } = require('langchain/vectorstores/faiss');
const { OpenAIEmbeddings } = require('langchain/embeddings/openai');
const { RecursiveCharacterTextSplitter } = require('langchain/text_splitter');
const dotenv = require('dotenv');
dotenv.config();

const injest_docs = async() => {
    const loader = new PDFLoader('FAQbotVido.pdf'); //you can change this to any PDF file of your choice.
    const docs = await loader.load();
    console.log('docs loaded');
    
    const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
    });

    const docOutput = await textSplitter.splitDocuments(docs);
    let vectorStore = await FaissStore.fromDocuments(
        docOutput,
        new OpenAIEmbeddings(),
    );
    console.log('saving...');

    // const directory = '/Users/yinka/Documents/art/OPENAI-PDF-CHATBOT/';
    const directory ='/Users/guntar/Documents/SourceCodes/NodeJS/wabot-vido/faissvector';
    await vectorStore.save(directory);
    console.log('saved!');
};

injest_docs();

module.exports = { injest_docs };