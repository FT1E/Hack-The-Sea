export default function GameScreen() {

    const unlockFish = () => {
        const unityFrame = document.getElementById("unity-frame");

        unityFrame.contentWindow.postMessage(
            {
                type: "UNLOCK_FISH",
                fishId: "test"
            },
            "*"
        );
    };

    return (
        <div>
            <button
                onClick={unlockFish}
                style={{
                    position: "absolute",
                    zIndex: 10,
                    top: 20,
                    left: 20,
                    padding: "12px 20px",
                }}
            >
                Unlock Fish
            </button>

            <iframe
                id="unity-frame"
                src="/unity-build/index.html"
                style={{
                    width: "100%",
                    height: "100vh",
                    border: "none",
                }}
                title="Unity Ocean"
            />
        </div>
    );
}