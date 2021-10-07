import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import styled from "styled-components";
import { Row, Col, Form, Input, Button, Icon, Carousel, Tabs } from "antd";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

const { TabPane } = Tabs;

const ProductIdStyled = styled.div`
  width: 100%;
  height: 80vh;
  margin: 0 auto;
  background-color: white;
  border: 1px solid #0d5cb6;
  border-radius: 4px;
`;

const CloseStyled = styled(Col)`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  font-size: 25px;
  &:hover {
    color: #ff3945;
    cursor: pointer;
  }
`;

const FormItemStyled = styled(Form.Item)`
  margin-bottom: 0;
  label {
    font-weight: bold;
  }
`;

const InputStyled = styled(Input)`
  &:disabled {
    border: none;
    background-color: #f4f4f4;
    color: black;
    cursor: pointer;
  }
`;

const InputTextAreaStyled = styled(Input.TextArea)`
  &:disabled {
    border: none;
    background-color: #f4f4f4;
    color: black;
    cursor: pointer;
    overflow-y: auto;
  }
`;

const CarouselStyled = styled(Carousel)`
  width: 90%;
  margin: 0 auto;
  .slick-arrow.slick-prev::before {
    content: "<";
    font-size: 25px;
    color: gray;
  }
  .slick-arrow.slick-next::before {
    content: ">";
    font-size: 25px;
    color: gray;
  }
`;

const ImageStyled = styled.img`
  width: 100%;
  margin-top: 25px;
  border: 1px solid black;
  border-radius: 2px;
`;

@inject("rootStore")
@observer
class ProductId extends Component {
  constructor(props) {
    super(props);
    this.newTabIndex =
      1 + this.props.rootStore.productStore.form.producer.length;
    this.state = {
      isEdit: false,
      isMap: false,
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
    if (this.state.isEdit) {
      this.props.rootStore.productStore.removeProducer(targetKey);
      this.setState({ activeKey: "1" });
    }
  };

  render() {
    const currentStore = this.props.rootStore.productStore;
    return (
      <ProductIdStyled>
        <Row>
          <Col span={9}>
            <CarouselStyled autoplay arrows>
              <ImageStyled
                alt="example"
                src="https://hanoicomputercdn.com/media/product/55916_ban_phim_co_akko_3108_v2_one_piece_chopper_usb_akko_orange_switch_0001_2.jpg"
              />

              <ImageStyled
                alt="example"
                src="https://akkogear.com.vn/wp-content/uploads/2020/09/3108_dbz_Frieza_800_3.jpg"
              />

              <ImageStyled
                alt="example"
                src="https://bienhoagear.com/wp-content/uploads/2021/03/AKKO-3108-Monet-Pond-03.jpg"
              />
            </CarouselStyled>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                width: "90%",
                margin: "10px 10px",
                textAlign: "center",
              }}
            >
              <h1>{currentStore.form?.name}</h1>
              <p>{currentStore.form.detail?.description}</p>
            </div>
          </Col>
          <Col span={14}>
            <div
              style={{
                backgroundColor: "#f4f4f4",
                marginTop: "25px",
                padding: "10px",
                display: this.state.isMap ? "none" : "",
              }}
            >
              <Form
                labelCol={{ span: 3, offset: 1 }}
                wrapperCol={{ span: 20 }}
                labelAlign="left"
              >
                <FormItemStyled label="Name">
                  <InputStyled
                    disabled={!this.state.isEdit}
                    value={currentStore.form.name}
                    type="text"
                    onChange={(e) =>
                      currentStore.setForm("name", 0, e.target.value)
                    }
                  />
                </FormItemStyled>

                <FormItemStyled label="Cost">
                  <InputStyled
                    disabled={!this.state.isEdit}
                    value={currentStore.form.cost}
                    type="number"
                    onChange={(e) =>
                      currentStore.setForm("cost", 0, e.target.value)
                    }
                  />
                </FormItemStyled>

                <FormItemStyled label="Quantity">
                  <InputStyled
                    disabled={!this.state.isEdit}
                    value={currentStore.form.quantity}
                    type="number"
                    onChange={(e) =>
                      currentStore.setForm("quantity", 0, e.target.value)
                    }
                  />
                </FormItemStyled>

                <FormItemStyled label="Detail">
                  <InputStyled
                    disabled={!this.state.isEdit}
                    value={currentStore.form.detail.short_description}
                    onChange={(e) =>
                      currentStore.setForm(
                        "detail",
                        "short_description",
                        e.target.value
                      )
                    }
                  />
                  <InputTextAreaStyled
                    disabled={!this.state.isEdit}
                    value={currentStore.form.detail.description}
                    rows={4}
                    onChange={(e) =>
                      currentStore.setForm(
                        "detail",
                        "description",
                        e.target.value
                      )
                    }
                  />
                </FormItemStyled>
                <FormItemStyled label="Producer">
                  <div style={{ marginBottom: 16 }}>
                    <Button
                      disabled={!this.state.isEdit}
                      onClick={this.add}
                      type="primary"
                    >
                      <Icon type="plus-circle" />
                    </Button>
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
                        <InputStyled
                          disabled={!this.state.isEdit}
                          placeholder="Please enter producer name . . ."
                          value={pane.name}
                          onChange={(e) =>
                            currentStore.setProducer(
                              pane.key,
                              "name",
                              e.target.value
                            )
                          }
                        />
                        <Row>
                          <Col className="mr-10" span={6}>
                            <InputStyled
                              disabled={!this.state.isEdit}
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
                            <InputStyled
                              disabled={!this.state.isEdit}
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
                </FormItemStyled>

                <FormItemStyled label="LocationId">
                  <InputStyled
                    disabled={!this.state.isEdit}
                    type="number"
                    value={currentStore.form.locationId}
                    onChange={(e) =>
                      currentStore.setForm("locationId", 0, e.target.value)
                    }
                  />
                </FormItemStyled>

                <FormItemStyled label="FamilyId">
                  <InputStyled
                    disabled={!this.state.isEdit}
                    type="number"
                    value={currentStore.form.familyId}
                    onChange={(e) =>
                      currentStore.setForm("familyId", 0, e.target.value)
                    }
                  />
                </FormItemStyled>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "right",
                    gap: "10px",
                  }}
                >
                  <Button
                    type="primary"
                    onClick={() => this.setState({ isMap: true })}
                  >
                    <Icon type="environment" />
                  </Button>

                  <Button
                    type="primary"
                    style={{ display: this.state.isEdit ? "none" : "" }}
                    onClick={() => {
                      this.setState({ isEdit: true });
                    }}
                  >
                    Edit <Icon type="edit" />
                  </Button>

                  <div
                    style={{
                      display: this.state.isEdit ? "flex" : "none",
                      gap: "10px",
                    }}
                  >
                    <Button
                      type="primary"
                      onClick={() => {
                        this.setState({ isEdit: false });
                      }}
                    >
                      Cancel
                    </Button>

                    <Button
                      type="primary"
                      onClick={async () => {
                        currentStore.setId(this.props.match.params.id);
                        await currentStore.edit();
                        this.setState({ isEdit: false });
                      }}
                    >
                      Ok
                    </Button>
                  </div>
                </div>
              </Form>
            </div>
            <div
              style={{
                display: this.state.isMap ? "" : "none",
              }}
            >
              <div
                style={{
                  marginTop: "25px",
                  borderRadius: "4px",
                  position: "relative",
                  zIndex: "1",
                }}
              >
                <div
                  style={{
                    justifyContent: "right",
                    position: "absolute",
                    right: "20px",
                    top: "25px",
                    zIndex: "2",
                  }}
                >
                  <Button
                    type="primary"
                    onClick={() => this.setState({ isMap: false })}
                  >
                    CLose
                  </Button>
                </div>
                {this.state.isMap ? (
                  <Map
                    style={{
                      height: "70vh",
                      width: "100%",
                      borderRadius: "4px",
                      zIndex: "1",
                    }}
                    center={[
                      currentStore.form.producer[0].locationLat,
                      currentStore.form.producer[0].locationLong,
                    ]}
                    zoom={13}
                    scrollWheelZoom={false}
                  >
                    <TileLayer
                      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {currentStore.form.producer.map((pr) => (
                      <Marker position={[pr.locationLat, pr.locationLong]}>
                        <Popup>{currentStore.form.name}</Popup>
                      </Marker>
                    ))}
                  </Map>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </Col>
          <CloseStyled
            span={1}
            onClick={() => this.props.history.push("/products")}
          >
            <Icon type="close" />
          </CloseStyled>
        </Row>
      </ProductIdStyled>
    );
  }
}

export default ProductId;
