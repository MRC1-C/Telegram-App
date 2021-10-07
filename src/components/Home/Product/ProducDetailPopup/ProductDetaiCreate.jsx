import { Input, Form, Empty, Row, Col, Button, Tabs } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import styled from "styled-components";

const { TabPane } = Tabs;

const FormItemStyled = styled(Form.Item)`
  margin-bottom: 0;
`;
@inject("rootStore")
@observer
class ProducDetailPopup extends React.Component {
  constructor(props) {
    super(props);
    this.newTabIndex = 2;
    this.state = {
      activeKey: "1",
    };
  }

  onChange = (activeKey) => {
    this.setState({ activeKey });
  };

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  };

  add = () => {
    const activeKey = `${this.newTabIndex++}`;
    this.props.rootStore.productStore.addProducer({
      title: `Tab${activeKey}`,
      key: activeKey,
      name: "",
      locationLat: "",
      locationLong: "",
    });

    this.setState({ activeKey });
  };

  remove = (targetKey) => {
    this.props.rootStore.productStore.removeProducer(targetKey);
    this.setState({ activeKey: "1" });
  };

  render() {
    const { currentStore } = this.props;
    //console.log(this.props.rootStore.productStore.form.producer);
    return currentStore?.form ? (
      <Form>
        <FormItemStyled label="Name">
          <Input
            placeholder="Please enter product name . . ."
            value={currentStore.form.name}
            type="text"
            onChange={(e) => currentStore.setForm("name", 0, e.target.value)}
          />
        </FormItemStyled>
        <Row>
          <Col className="mr-10 flex" span={6}>
            <FormItemStyled label="Cost">
              <Input
                placeholder="Please enter cost . . ."
                value={currentStore.form.cost}
                type="number"
                onChange={(e) =>
                  currentStore.setForm("cost", 0, e.target.value)
                }
              />
            </FormItemStyled>
          </Col>
          <Col span={6}>
            <FormItemStyled label="Quantity">
              <Input
                placeholder="Please enter quantity . . ."
                value={currentStore.form.quantity}
                type="number"
                onChange={(e) =>
                  currentStore.setForm("quantity", 0, e.target.value)
                }
              />
            </FormItemStyled>
          </Col>
        </Row>
        <FormItemStyled label="Detail">
          <Input
            placeholder="Please enter short description . . ."
            value={currentStore.form.detail.short_description}
            onChange={(e) =>
              currentStore.setForm(
                "detail",
                "short_description",
                e.target.value
              )
            }
          />
          <Input.TextArea
            rows={3}
            placeholder="Please enter description . . ."
            value={currentStore.form.detail.description}
            onChange={(e) =>
              currentStore.setForm("detail", "description", e.target.value)
            }
          />
        </FormItemStyled>
        <FormItemStyled label="Producer">
          <div style={{ marginBottom: 16 }}>
            <Button onClick={this.add}>ADD</Button>
          </div>
          <Tabs
            hideAdd
            onChange={this.onChange}
            activeKey={this.state.activeKey}
            type="editable-card"
            onEdit={this.onEdit}
          >
            {currentStore.form.producer.map((pane) => (
              <TabPane tab={pane.title} key={pane.key}>
                <Input
                  placeholder="Please enter producer name . . ."
                  value={pane.name}
                  onChange={(e) =>
                    currentStore.setProducer(pane.key, "name", e.target.value)
                  }
                />
                <Row>
                  <Col className="mr-10" span={6}>
                    <Input
                      placeholder="Location lat"
                      type="number"
                      value={pane.locationLat}
                      onChange={(e) =>
                        currentStore.setProducer(
                          pane.key,
                          "locationLat",
                          e.target.value
                        )
                      }
                    />
                  </Col>
                  <Col span={6}>
                    <Input
                      placeholder="Location long"
                      type="number"
                      value={pane.locationLong}
                      onChange={(e) =>
                        currentStore.setProducer(
                          pane.key,
                          "locationLong",
                          e.target.value
                        )
                      }
                    />
                  </Col>
                </Row>
              </TabPane>
            ))}
          </Tabs>
          {/* <Input
            placeholder="Please enter producer name . . ."
            value={currentStore.form.producer.name}
            onChange={(e) =>
              currentStore.setForm("producer", "name", e.target.value)
            }
          />
          <Row>
            <Col className="mr-10" span={6}>
              <Input
                placeholder="Location lat"
                type="number"
                value={currentStore.form.producer.locationLat}
                onChange={(e) =>
                  currentStore.setForm(
                    "producer",
                    "locationLat",
                    e.target.value
                  )
                }
              />
            </Col>
            <Col span={6}>
              <Input
                placeholder="Location long"
                type="number"
                value={currentStore.form.producer.locationLong}
                onChange={(e) =>
                  currentStore.setForm(
                    "producer",
                    "locationLong",
                    e.target.value
                  )
                }
              />
            </Col>
          </Row> */}
        </FormItemStyled>
        <Row>
          <Col className="mr-10" span={6}>
            <FormItemStyled label="LocationId">
              <Input
                placeholder="Please enter locationId . . ."
                type="number"
                value={currentStore.form.locationId}
                onChange={(e) =>
                  currentStore.setForm("locationId", 0, e.target.value)
                }
              />
            </FormItemStyled>
          </Col>
          <Col span={6}>
            <FormItemStyled label="FamilyId">
              <Input
                placeholder="Please enter familyId . . ."
                type="number"
                value={currentStore.form.familyId}
                onChange={(e) =>
                  currentStore.setForm("familyId", 0, e.target.value)
                }
              />
            </FormItemStyled>
          </Col>
        </Row>
      </Form>
    ) : (
      <Empty />
    );
  }
}
export default ProducDetailPopup;
