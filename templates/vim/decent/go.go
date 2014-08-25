package session

import (
	"bytes"
	"crypto/rand"
	"crypto/sha1"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"
)

type RequestSignature string

type Request struct {
	Url     string
	Method  string
	Session *Session
	Body    *Body
}

type Body struct {
	Method     *string     `json:"method"`
	Header     *Header     `json:"header"`
	Parameters interface{} `json:"parameters"`
}

type Header struct {
	Privacy        int              `json:"privacy"`
	Client         string           `json:"client"`
	ClientRevision string           `json:"clientRevision"`
	UUID           string           `json:"uuid"`
	Country        *Country         `json:"country"`
	SessionId      SessionId        `json:"session"`
	Token          RequestSignature `json:"token,omitempty"`
}

// NewRequest creates a new request
func NewRequest(session *Session, method string, parameters interface{}) (request *Request) {
	request = &Request{
		Url:     "http://grooveshark.com/more.php?" + method,
		Method:  method,
		Session: session,
	}

	body := &Body{
		Method:     &(*request).Method,
		Parameters: parameters,

		Header: &Header{
			Client:         session.Client,
			ClientRevision: session.ClientRevision,

			Privacy: 0,
			Country: session.Country,

			UUID:      session.UUID,
			SessionId: session.SessionId,
		},
	}

	request.Body = body

	return request
}

// Sign generates a signature for this request
func (r *Request) Sign() {
	// get the session token
	token := r.Session.Token()

	// generate random nonce
	nonceBytes := make([]byte, 3)
	rand.Read(nonceBytes)
	nonce := hex.EncodeToString(nonceBytes)

	// concat values together
	input := strings.Join([]string{
		r.Method, string(token), r.Session.Salt, nonce,
	}, ":")

	// hash with sha1
	hash := sha1.New()
	hash.Write([]byte(input))

	// convert to hex
	signature := hex.EncodeToString(hash.Sum(nil))

	// add to header
	header := (*r.Body).Header
	(*header).Token = RequestSignature(nonce + signature)
}

// Send makes the request
func (r *Request) Send(resp interface{}) error {
	data, err := json.Marshal(*r.Body)
	if err != nil {
		return err
	}

	body := bytes.NewReader(data)

	res, err := http.Post(r.Url, "application/json", body)
	if err != nil {
		return err
	}

	resBody, err := ioutil.ReadAll(res.Body)
	if err != nil {
		return err
	}

	err = json.Unmarshal(resBody, &resp)
	if err != nil {
		fmt.Printf("%+v\n", res)
		fmt.Println(string(resBody))
		return err
	}

	return nil
}
