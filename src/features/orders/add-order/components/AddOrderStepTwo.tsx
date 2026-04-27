import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { designSystemColors } from "@/config/theme";
import { channelOptions } from "../utils/constants";
import { type FormState, type NotificationChannel } from "../types";
import {
  ChannelCard,
  ChannelCardLeft,
  ChannelDescription,
  ChannelGrid,
  ChannelIconTile,
  ChannelSelectionDot,
  ChannelText,
  ChannelTitleRow,
  ContentLayout,
  IosSwitch,
  StepTwoIntro,
  UpdateCard,
  UpdateCardText,
} from "../styles";

type AddOrderStepTwoProps = {
  form: FormState;
  onToggleChannel: (channel: NotificationChannel) => void;
  onAutomaticUpdateChange: (
    key: keyof FormState["automaticUpdates"],
    value: boolean,
  ) => void;
};

export default function AddOrderStepTwo({
  form,
  onToggleChannel,
  onAutomaticUpdateChange,
}: AddOrderStepTwoProps) {
  const creditChipSx = {
    backgroundColor: "rgba(255, 127, 0, 0.16)",
    color: "rgb(217, 95, 2)",
    fontWeight: 600,
  };

  const freeChipSx = {
    backgroundColor: "rgba(0, 168, 84, 0.16)",
    color: "rgb(0, 128, 64)",
    fontWeight: 600,
  };

  return (
    <ContentLayout>
      <StepTwoIntro>
        Select how you want Drop to notify your buyer. All fields are optional.
        You can skip updates entirely.
      </StepTwoIntro>

      <Typography variant="h5" sx={{ color: designSystemColors.neutralBlack }}>
        Notification Channel
      </Typography>

      <ChannelGrid>
        {channelOptions.map((channel) => {
          const Icon = channel.icon;
          const isSelected = form.channels.includes(channel.value);
          const description = channel.usesCredits
            ? "1 credit per update"
            : "Included for all users";

          return (
            <ChannelCard
              key={channel.value}
              type="button"
              selected={isSelected}
              onClick={() => onToggleChannel(channel.value)}
            >
              <ChannelCardLeft>
                <ChannelIconTile active={isSelected}>
                  <Icon fontSize="small" />
                </ChannelIconTile>

                <ChannelText>
                  <ChannelTitleRow>
                    <Typography variant="h5">{channel.label}</Typography>
                    {channel.usesCredits ? (
                      <Chip
                        label="Uses credits"
                        size="small"
                        sx={creditChipSx}
                      />
                    ) : (
                      <Chip label="Free" size="small" sx={freeChipSx} />
                    )}
                  </ChannelTitleRow>

                  <ChannelDescription>{description}</ChannelDescription>
                </ChannelText>
              </ChannelCardLeft>

              <ChannelSelectionDot selected={isSelected} />
            </ChannelCard>
          );
        })}
      </ChannelGrid>

      <Typography
        variant="h5"
        sx={{ color: designSystemColors.neutralBlack, mt: 1.5 }}
      >
        Automatic Updates
      </Typography>

      <Stack spacing={1.5}>
        <UpdateCard>
          <UpdateCardText>
            <Typography variant="h5">Order Sent</Typography>
            <ChannelDescription>
              Will send via selected channel
            </ChannelDescription>
          </UpdateCardText>

          <IosSwitch
            checked={form.automaticUpdates.orderSent}
            onChange={(event) =>
              onAutomaticUpdateChange("orderSent", event.target.checked)
            }
          />
        </UpdateCard>

        <UpdateCard>
          <UpdateCardText>
            <Typography variant="h5">ETA: 3 Days Remaining</Typography>
            <ChannelDescription>
              Will send via selected channel
            </ChannelDescription>
          </UpdateCardText>

          <IosSwitch
            checked={form.automaticUpdates.eta}
            onChange={(event) =>
              onAutomaticUpdateChange("eta", event.target.checked)
            }
          />
        </UpdateCard>
      </Stack>
    </ContentLayout>
  );
}
