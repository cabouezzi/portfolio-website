import React, { useEffect, useRef } from 'react';

const InteractiveWeather = () => {
  const canvasRef = useRef(null);
  const unityInstanceRef = useRef(null);
  const scriptRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size explicitly
    canvas.style.width = "960px";
    canvas.style.height = "600px";

    // Build URL - using the public folder
    const buildUrl = `${process.env.PUBLIC_URL}/weather/Build`;
    const loaderUrl = `${buildUrl}/Build-WebGL.loader.js`;

    const config = {
      dataUrl: `${buildUrl}/Build-WebGL.data`,
      frameworkUrl: `${buildUrl}/Build-WebGL.framework.js`,
      codeUrl: `${buildUrl}/Build-WebGL.wasm`,
      streamingAssetsUrl: "StreamingAssets",
      companyName: "DefaultCompany",
      productName: "Weather",
      productVersion: "0.1",
    };

    // Load the Unity loader script
    const script = document.createElement("script");
    scriptRef.current = script;
    script.src = loaderUrl;
    
    script.onload = () => {
      if (window.createUnityInstance) {
        window.createUnityInstance(canvas, config, (progress) => {
          console.log(`Loading: ${Math.round(progress * 100)}%`);
        })
          .then((unityInstance) => {
            unityInstanceRef.current = unityInstance;
            console.log('Unity instance loaded successfully');
          })
          .catch((message) => {
            console.error('Unity load error:', message);
          });
      }
    };

    script.onerror = () => {
      console.error('Failed to load Unity WebGL loader');
    };

    document.body.appendChild(script);

    // Cleanup
    return () => {
      if (unityInstanceRef.current) {
        try {
          unityInstanceRef.current.Quit();
        } catch (e) {
          console.error('Error quitting Unity instance:', e);
        }
      }
      if (scriptRef.current && document.body.contains(scriptRef.current)) {
        document.body.removeChild(scriptRef.current);
      }
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      id="unity-canvas" 
      width="960" 
      height="600"
      tabIndex="-1"
    />
  );
};

export default InteractiveWeather;
