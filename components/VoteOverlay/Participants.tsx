import { useVoteValue } from "@esportlayers/io";
import { ReactElement } from "react";
import AnimatedNumber from "animated-number-react";

export default function Participants(): ReactElement | null {
    const [state] = useVoteValue();
    if(state) {
        return <div className={'participants'}>
            <div className={'icon'}>
                <svg viewBox="0 0 640 448" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M96 192C131.3 192 160 163.3 160 128C160 92.7 131.3 64 96 64C60.7 64 32 92.7 32 128C32 163.3 60.7 192 96 192ZM544 192C579.3 192 608 163.3 608 128C608 92.7 579.3 64 544 64C508.7 64 480 92.7 480 128C480 163.3 508.7 192 544 192ZM576 224H512C494.4 224 478.5 231.1 466.9 242.6C507.2 264.7 535.8 304.6 542 352H608C625.7 352 640 337.7 640 320V288C640 252.7 611.3 224 576 224ZM320 224C381.9 224 432 173.9 432 112C432 50.1 381.9 0 320 0C258.1 0 208 50.1 208 112C208 173.9 258.1 224 320 224ZM396.8 256H388.5C367.7 266 344.6 272 320 272C295.4 272 272.4 266 251.5 256H243.2C179.6 256 128 307.6 128 371.2V400C128 426.5 149.5 448 176 448H464C490.5 448 512 426.5 512 400V371.2C512 307.6 460.4 256 396.8 256ZM173.1 242.6C161.5 231.1 145.6 224 128 224H64C28.7 224 0 252.7 0 288V320C0 337.7 14.3 352 32 352H97.9C104.2 304.6 132.8 264.7 173.1 242.6Z" fill="#c2c2c2"/>
                </svg>
            </div>

            <div className={'participations'}>
                <AnimatedNumber value={state.totalVotesCount} formatValue={(value) => value.toFixed(0)} />
            </div>

            <style jsx>{`
                .participants {
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                }  

                .icon {
                    height: 3rem;
                    width: 2rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }  

                .icon :global(svg) {
                    width: 100%;
                }

                .participations, .participations :global(span) {
                    font-family: monospace;
                }
            `}</style>
        </div>
    }

    return null;
}